"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ClubCard from "@/components/club-card";

export default function ClubsPage() {
  const [clubs, setClubs] = useState<any[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Track page load
  useEffect(() => {
    window.umami?.track("clubs_page_view");
  }, []);

  // Fetch clubs from API
  useEffect(() => {
    async function fetchClubs() {
      try {
        const res = await fetch("/api/clubs");
        const data = await res.json();

        setClubs(data);
        setFilteredClubs(data);

        const uniqueCategories = ["All", ...new Set(data.map((club: any) => club.category))].sort();
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchClubs();
  }, []);

  // Filtering logic
  useEffect(() => {
    let filtered = clubs;

    if (searchQuery) {
      filtered = filtered.filter(
        (club) =>
          club.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          club.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((club) => club.category === selectedCategory);
    }

    if (activeCategories.length > 0) {
      filtered = filtered.filter((club) => activeCategories.includes(club.category));
    }

    setFilteredClubs(filtered);
  }, [searchQuery, selectedCategory, activeCategories, clubs]);

  const toggleCategory = (category: string) => {
    const updated = activeCategories.includes(category)
      ? activeCategories.filter((c) => c !== category)
      : [...activeCategories, category];

    setActiveCategories(updated);
    setSelectedCategory("All");

    // ✅ Track filter interaction
    window.umami?.track("clubs_filter_toggle", { category, active: !activeCategories.includes(category) });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.trim().length > 0) {
      window.umami?.track("clubs_search", { query: value });
    }
  };

  const handleCategorySelect = (value: string) => {
    setSelectedCategory(value);
    setActiveCategories([]);
    if (value !== "All") {
      window.umami?.track("clubs_category_select", { category: value });
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setActiveCategories([]);
    window.umami?.track("clubs_reset_filters");
  };

  if (loading) {
    return (
      <div className="pt-24 text-center">
        <h2 className="text-xl font-medium">Loading clubs...</h2>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <div className="container">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">All Clubs</h1>
          <p className="text-muted-foreground">
            Explore all the clubs available at Woxsen University
          </p>
        </div>

        {/* Search + Filter */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="relative md:col-span-3">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clubs by name or keyword..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              data-umami-event="clubs_search_input"
            />
          </div>

          <Select value={selectedCategory} onValueChange={handleCategorySelect}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Badges */}
        <div className="mb-8 flex flex-wrap gap-2">
          <div className="flex items-center mr-2">
            <Filter className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          {categories
            .filter((c) => c !== "All")
            .map((category) => (
              <Badge
                key={category}
                variant={activeCategories.includes(category) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleCategory(category)}
                data-umami-event="clubs_badge_toggle"
                data-umami-event-category={category}
              >
                {category}
              </Badge>
            ))}
          {activeCategories.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7"
              onClick={resetFilters}
              data-umami-event="clubs_clear_filters"
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Club Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {filteredClubs.length > 0 ? (
            filteredClubs.map((club, index) => (
              <motion.div
                key={club.id || club._id || `club-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                data-umami-event="club_card_view"
                data-umami-event-name={club.name}
                onClick={() => window.umami?.track("club_card_click", { club: club.name })}
              >
                <ClubCard club={club} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <h3 className="text-xl font-medium mb-2">No clubs found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
