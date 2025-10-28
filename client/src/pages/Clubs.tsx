import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { ClubCard } from "@/components/ClubCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState } from "react";
import type { Club } from "@shared/schema";

export default function Clubs() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: clubs, isLoading } = useQuery<Club[]>({
    queryKey: ["/api/clubs"],
  });
  
  const categories = [
    { id: "all", label: t("allClubs") },
    { id: "sports", label: t("sports") },
    { id: "arts", label: t("arts") },
    { id: "science", label: t("science") },
    { id: "music", label: t("music") },
    { id: "technology", label: t("technology") },
    { id: "languages", label: t("languages") },
    { id: "dance", label: t("dance") },
    { id: "theater", label: t("theater") },
  ];
  
  const filteredClubs = clubs?.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "all" || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground" data-testid="text-clubs-title">
            {t("allClubs")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("exploreClubs")}
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("searchClubs")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              className="pl-10"
              data-testid="input-search-clubs"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id || (!selectedCategory && category.id === "all") ? "default" : "outline"}
                className="cursor-pointer hover-elevate active-elevate-2"
                onClick={() => setSelectedCategory(category.id === "all" ? null : category.id)}
                data-testid={`filter-category-${category.id}`}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Clubs Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-pulse text-primary">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="mt-4 text-muted-foreground">{t("loading")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="clubs-grid">
            {filteredClubs?.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        )}
        
        {filteredClubs?.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">{t("noClubsFound")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
