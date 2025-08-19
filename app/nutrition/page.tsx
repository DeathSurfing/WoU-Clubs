"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { weeklyMenu, type MenuItem } from "@/data/nutrition"
import Image from "next/image"

export default function NutritionPage() {
  const [selectedDay, setSelectedDay] = useState("monday")
  const [selectedDietType, setSelectedDietType] = useState("all")
  const [selectedMeal, setSelectedMeal] = useState("all")

  // Get the selected day's menu
  const dayMenu = weeklyMenu.find((day) => day.id === selectedDay)

  // Filter menu items based on diet type
  const filterMenuItems = (items: MenuItem[]) => {
    if (selectedDietType === "all") return items
    if (selectedDietType === "vegetarian") return items.filter((item) => item.isVegetarian)
    if (selectedDietType === "vegan") return items.filter((item) => item.isVegan)
    if (selectedDietType === "gluten-free") return items.filter((item) => !item.containsGluten)
    return items
  }

  // Get all meals for the selected day
  const getAllMeals = () => {
    if (!dayMenu) return []

    const breakfast = filterMenuItems(dayMenu.breakfast).map((item) => ({ ...item, mealType: "Breakfast" }))
    const lunch = filterMenuItems(dayMenu.lunch).map((item) => ({ ...item, mealType: "Lunch" }))
    const dinner = filterMenuItems(dayMenu.dinner).map((item) => ({ ...item, mealType: "Dinner" }))
    const snacks = dayMenu.snacks
      ? filterMenuItems(dayMenu.snacks).map((item) => ({ ...item, mealType: "Snacks" }))
      : []

    return [...breakfast, ...lunch, ...dinner, ...snacks]
  }

  // Get meals based on selected meal type
  const getMealsByType = () => {
    if (!dayMenu) return []
    if (selectedMeal === "all") return getAllMeals()

    if (selectedMeal === "breakfast") {
      return filterMenuItems(dayMenu.breakfast).map((item) => ({ ...item, mealType: "Breakfast" }))
    }
    if (selectedMeal === "lunch") {
      return filterMenuItems(dayMenu.lunch).map((item) => ({ ...item, mealType: "Lunch" }))
    }
    if (selectedMeal === "dinner") {
      return filterMenuItems(dayMenu.dinner).map((item) => ({ ...item, mealType: "Dinner" }))
    }
    if (selectedMeal === "snacks" && dayMenu.snacks) {
      return filterMenuItems(dayMenu.snacks).map((item) => ({ ...item, mealType: "Snacks" }))
    }

    return []
  }

  const filteredMeals = getMealsByType()

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Campus Dining Menu</h1>
          <p className="text-lg text-muted-foreground">
            Explore our weekly menu offerings at the Woxsen University dining facilities.
          </p>
        </motion.div>

        {/* Disclaimer Alert */}
        <Alert className="mb-8 bg-amber-50 dark:bg-amber-950/30">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
          <AlertTitle className="text-amber-800 dark:text-amber-400">Menu Disclaimer</AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-300">
            This menu is subject to change due to unforeseen circumstances such as supply chain issues, seasonal
            availability of ingredients, or other operational challenges. We strive to provide accurate information and
            will update the menu as changes occur.
          </AlertDescription>
        </Alert>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Day:</span>
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {weeklyMenu.map((day) => (
                  <SelectItem key={day.id} value={day.id}>
                    {day.day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Diet Type:</span>
            <Select value={selectedDietType} onValueChange={setSelectedDietType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select diet type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="gluten-free">Gluten-Free</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Meal:</span>
            <Select value={selectedMeal} onValueChange={setSelectedMeal}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select meal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Meals</SelectItem>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snacks">Snacks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Menu Display */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>
              {dayMenu?.day} Menu
              {selectedDietType !== "all" && (
                <Badge className="ml-2">
                  {selectedDietType === "vegetarian" && "Vegetarian"}
                  {selectedDietType === "vegan" && "Vegan"}
                  {selectedDietType === "gluten-free" && "Gluten-Free"}
                </Badge>
              )}
              {selectedMeal !== "all" && (
                <Badge variant="outline" className="ml-2">
                  {selectedMeal === "breakfast" && "Breakfast"}
                  {selectedMeal === "lunch" && "Lunch"}
                  {selectedMeal === "dinner" && "Dinner"}
                  {selectedMeal === "snacks" && "Snacks"}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Nutritional information and dietary details for today's meals</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredMeals.length > 0 ? (
              <Table>
                <TableCaption>Menu for {dayMenu?.day} - Last updated: April 11, 2025</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Meal</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Calories</TableHead>
                    <TableHead className="text-right">Protein</TableHead>
                    <TableHead className="text-right">Dietary Info</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMeals.map((item) => (
                    <TableRow key={`${item.id}-${item.mealType}`}>
                      <TableCell>
                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src={item.image || "/placeholder.svg?height=100&width=100"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.mealType}</TableCell>
                      <TableCell className="max-w-[300px]">
                        <span className="line-clamp-2">{item.description}</span>
                      </TableCell>
                      <TableCell className="text-right">{item.calories} kcal</TableCell>
                      <TableCell className="text-right">{item.protein}g</TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-wrap justify-end gap-1">
                          {item.isVegetarian && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge
                                    variant="outline"
                                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  >
                                    V
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Vegetarian</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {item.isVegan && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge
                                    variant="outline"
                                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  >
                                    VG
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Vegan</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {item.containsGluten && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge
                                    variant="outline"
                                    className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                  >
                                    G
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Contains Gluten</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {item.containsNuts && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge
                                    variant="outline"
                                    className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                  >
                                    N
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Contains Nuts</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {item.containsDairy && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge
                                    variant="outline"
                                    className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                  >
                                    D
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Contains Dairy</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <h3 className="mb-2 text-xl font-medium">No menu items found</h3>
                <p className="mb-6 text-muted-foreground">
                  No items match your current filter criteria. Try adjusting your filters.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedDietType("all")
                    setSelectedMeal("all")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Nutritional Information */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Dietary Information Guide</CardTitle>
            <CardDescription>Understanding the dietary indicators and nutritional information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold">Dietary Indicators</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    >
                      V
                    </Badge>
                    <span>Vegetarian - Contains no meat, poultry, fish, or seafood</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    >
                      VG
                    </Badge>
                    <span>Vegan - Contains no animal products or by-products</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                    >
                      G
                    </Badge>
                    <span>Contains Gluten - Contains wheat, barley, rye, or derivatives</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                      N
                    </Badge>
                    <span>Contains Nuts - Contains tree nuts or peanuts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      D
                    </Badge>
                    <span>Contains Dairy - Contains milk or milk products</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold">Nutritional Information</h3>
                <p className="mb-4 text-muted-foreground">
                  Our menu provides key nutritional information to help you make informed dietary choices:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">Calories:</span> Total energy content in kilocalories
                    (kcal)
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Protein:</span> Amount of protein in grams (g)
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Carbs:</span> Total carbohydrates in grams (g)
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Fat:</span> Total fat content in grams (g)
                  </li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  For detailed nutritional information or specific dietary concerns, please contact our dining services
                  at
                  <a href="mailto:studentaffairs@woxsen.edu.in" className="text-primary hover:underline">
                    {" "}
                    studentaffairs@woxsen.edu.in
                  </a>
                  .
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Section */}
        <Card>
          <CardHeader>
            <CardTitle>We Value Your Feedback</CardTitle>
            <CardDescription>
              Help us improve our dining services by sharing your thoughts and suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold">Share Your Thoughts</h3>
                <p className="mb-4 text-muted-foreground">
                  Your feedback helps us improve our menu offerings and dining experience. Let us know what you enjoy
                  and what we could do better.
                </p>
                <Button className="bg-[#EE495C] hover:bg-[#EE495C]/90">Submit Feedback</Button>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold">Special Dietary Needs?</h3>
                <p className="mb-4 text-muted-foreground">
                  If you have specific dietary requirements or allergies not addressed in our menu, please contact our
                  dining services team for assistance.
                </p>
                <Button variant="outline">Request Special Accommodation</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
