'use client';

import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Trophy, Users, MapPin, Calendar, Mail, ExternalLink } from 'lucide-react';

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Trophy className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Trophy className="h-6 w-6 text-amber-600" />;
    default:
      return (
        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
          {rank}
        </div>
      );
  }
};

const getInitials = (name: string) =>
  name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);

const hasValidValue = (value: any) =>
  value &&
  value !== '' &&
  value.toString().toLowerCase() !== 'n/a' &&
  value.toString().toLowerCase() !== 'nan' &&
  value.toString().trim() !== '';

const getMatrixScore = (score: any) => {
  if (!score || score === '' || ['n/a', 'nan'].includes(score.toString().toLowerCase())) {
    return 0;
  }
  const numScore = parseInt(score);
  return isNaN(numScore) ? 0 : numScore;
};

export default function ClubsLeaderboard() {
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch data dynamically
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        console.log("📡 Fetching clubs from /api/clubs...");
        const res = await fetch('/api/clubs');
        if (!res.ok) {
          throw new Error(`Failed to fetch clubs (status ${res.status})`);
        }
        const data = await res.json();
        console.log("✅ Clubs fetched:", data);
        setClubs(data);
      } catch (err: any) {
        console.error("❌ Error fetching clubs:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        ⏳ Loading club data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        ⚠️ Failed to load clubs: {error}
      </div>
    );
  }

  // Sort & paginate
  const processedClubs = clubs.map(club => ({
    ...club,
    matrixScore: getMatrixScore(club.matrixScore),
  }));

  const sortedClubs = processedClubs.sort((a, b) => b.matrixScore - a.matrixScore);
  const totalPages = Math.ceil(sortedClubs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentClubs = sortedClubs.slice(startIndex, startIndex + itemsPerPage);

  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => setCurrentPage(1)}
            isActive={currentPage === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) items.push(<PaginationEllipsis key="ellipsis1" />);

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) items.push(<PaginationEllipsis key="ellipsis2" />);

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => setCurrentPage(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-background pt-12 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Club Leaderboard</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and join the most active and engaging clubs on campus.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold">{sortedClubs.length}</div>
              <div className="text-sm text-muted-foreground">Total Clubs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold">
                {sortedClubs.reduce((sum, club) => sum + (parseInt(club.memberCount) || 0), 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold">
                {sortedClubs.length > 0
                  ? Math.round(sortedClubs.reduce((sum, c) => sum + c.matrixScore, 0) / sortedClubs.length)
                  : 0}
              </div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          {currentClubs.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                No clubs found.
              </CardContent>
            </Card>
          ) : (
            currentClubs.map((club, index) => {
              const globalRank = startIndex + index + 1;
              const isTopThree = globalRank <= 3;

              return (
                <Card key={club.id} className={`hover:shadow-lg ${isTopThree ? 'ring-2 ring-primary/20' : ''}`}>
                  <CardContent className="p-6 flex gap-4 items-start">
                    {/* Rank */}
                    <div className="flex flex-col items-center gap-1">
                      {getRankIcon(globalRank)}
                      <span className="text-xs text-muted-foreground font-medium">#{globalRank}</span>
                    </div>

                    {/* Avatar */}
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={club.image} alt={club.name} />
                      <AvatarFallback>{getInitials(club.name)}</AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold">{club.name}</h3>
                          {hasValidValue(club.category) && (
                            <Badge variant="secondary">{club.category}</Badge>
                          )}
                          {hasValidValue(club.shortDescription) && (
                            <p className="text-sm text-muted-foreground line-clamp-2">{club.shortDescription}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-primary">{club.matrixScore}</div>
                          <div className="text-xs text-muted-foreground">Activity Score</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-muted-foreground">
                        {hasValidValue(club.memberCount) && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" /> {club.memberCount} members
                          </div>
                        )}
                        {hasValidValue(club.meetingSchedule) && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" /> {club.meetingSchedule}
                          </div>
                        )}
                        {hasValidValue(club.location) && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" /> {club.location}
                          </div>
                        )}
                        {hasValidValue(club.email) && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" /> {club.email}
                          </div>
                        )}
                      </div>

                      {hasValidValue(club.joinUrl) && (
                        <div className="flex justify-end mt-3">
                          <Button
                            variant={isTopThree ? "default" : "outline"}
                            size="sm"
                            onClick={() => window.open(club.joinUrl, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" /> Join Club
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationPrevious
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  className={`cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                />
                {generatePaginationItems()}
                <PaginationNext
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  className={`cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                />
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
