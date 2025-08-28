'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { clubsData } from '@/data/clubs';

const getRankIcon = (rank) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Trophy className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Trophy className="h-6 w-6 text-amber-600" />;
    default:
      return <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">{rank}</div>;
  }
};

const getInitials = (name) => {
  return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
};

// Helper function to check if a value should be displayed
const hasValidValue = (value) => {
  return value && 
         value !== '' && 
         value.toString().toLowerCase() !== 'n/a' && 
         value.toString().toLowerCase() !== 'nan' &&
         value.toString().trim() !== '';
};

// Helper function to get matrix score (returns 0 if invalid, otherwise the actual score)
const getMatrixScore = (score) => {
  if (!score || score === '' || score.toString().toLowerCase() === 'n/a' || score.toString().toLowerCase() === 'nan') {
    return 0;
  }
  const numScore = parseInt(score);
  return isNaN(numScore) ? 0 : numScore;
};

export default function ClubsLeaderboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of clubs per page

  // Process clubs: convert invalid matrixScores to 0, then sort by matrixScore in descending order
  const processedClubs = clubsData.map(club => ({
    ...club,
    matrixScore: getMatrixScore(club.matrixScore)
  }));
  
  const sortedClubs = processedClubs.sort((a, b) => b.matrixScore - a.matrixScore);

  // Pagination calculations
  const totalPages = Math.ceil(sortedClubs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClubs = sortedClubs.slice(startIndex, endIndex);

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is small
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
      // Show first page
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

      // Show ellipsis if needed
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show pages around current page
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

      // Show ellipsis if needed
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show last page
      if (totalPages > 1) {
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
            Discover and join the most active and engaging clubs on campus. Rankings based on activity, engagement, and impact scores.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-foreground">{sortedClubs.length}</div>
              <div className="text-sm text-muted-foreground">Total Clubs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-foreground">
                {sortedClubs.reduce((sum, club) => {
                  const memberCount = parseInt(club.memberCount || '0');
                  return sum + (isNaN(memberCount) ? 0 : memberCount);
                }, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-foreground">
                {sortedClubs.length > 0 ? Math.round(sortedClubs.reduce((sum, club) => sum + club.matrixScore, 0) / sortedClubs.length) : 0}
              </div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Pagination Info */}
        {sortedClubs.length > 0 && (
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>
              Showing {startIndex + 1}-{Math.min(endIndex, sortedClubs.length)} of {sortedClubs.length} clubs
            </span>
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        )}

        {/* Leaderboard */}
        <div className="space-y-4">
          {sortedClubs.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Clubs Available</h3>
                <p className="text-muted-foreground">
                  There are currently no clubs to display on the leaderboard.
                </p>
              </CardContent>
            </Card>
          ) : (
            currentClubs.map((club, index) => {
              const globalRank = startIndex + index + 1; // Calculate global rank across all pages
              const isTopThree = globalRank <= 3;
              
              return (
                <Card key={club.id} className={`transition-all duration-200 hover:shadow-lg ${isTopThree ? 'ring-2 ring-primary/20' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Rank */}
                      <div className="flex-shrink-0 flex flex-col items-center gap-1">
                        {getRankIcon(globalRank)}
                        <span className="text-xs text-muted-foreground font-medium">#{globalRank}</span>
                      </div>

                      {/* Club Avatar */}
                      <div className="flex-shrink-0">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={club.image} alt={club.name} />
                          <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                            {getInitials(club.name)}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      {/* Club Info */}
                      <div className="flex-grow min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-1">{club.name}</h3>
                            {hasValidValue(club.category) && (
                              <Badge variant="secondary" className="mb-2">
                                {club.category}
                              </Badge>
                            )}
                            {hasValidValue(club.shortDescription) && (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {club.shortDescription}
                              </p>
                            )}
                          </div>
                          
                          {/* Score */}
                          <div className="text-right flex-shrink-0">
                            <div className="text-3xl font-bold text-primary">{club.matrixScore}</div>
                            <div className="text-xs text-muted-foreground">Activity Score</div>
                          </div>
                        </div>

                        {/* Club Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 text-sm">
                          {hasValidValue(club.memberCount) && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{club.memberCount} members</span>
                            </div>
                          )}
                          {hasValidValue(club.meetingSchedule) && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{club.meetingSchedule}</span>
                            </div>
                          )}
                          {hasValidValue(club.location) && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{club.location}</span>
                            </div>
                          )}
                          {hasValidValue(club.email) && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="h-4 w-4" />
                              <span className="truncate">{club.email}</span>
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        {hasValidValue(club.joinUrl) && (
                          <div className="flex justify-end">
                            <Button 
                              variant={isTopThree ? "default" : "outline"} 
                              size="sm"
                              className="flex items-center gap-2"
                              onClick={() => window.open(club.joinUrl, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                              Join Club
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={`cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                  />
                </PaginationItem>
                
                {generatePaginationItems()}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={`cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Footer */}
        <Card className="bg-muted/30">
          <CardContent className="p-6 text-center">
            <CardTitle className="mb-2">Want to start your own club?</CardTitle>
            <CardDescription className="mb-4">
              Contact the Student Activities Office to learn about the club registration process.
            </CardDescription>
            <Button variant="outline">
              Learn More
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
