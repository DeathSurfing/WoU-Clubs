"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface OrgNode {
  id: string
  name: string
  title: string
  children?: OrgNode[]
  type?: "school" | "university" | "main"
}

interface OrganizationChartProps {
  data: OrgNode
}

const OrganizationChart = ({ data }: OrganizationChartProps) => {
  const schoolPresidents = data.children?.find(child => child.id === "school-clubs")?.children || []
  const universityPresidents = data.children?.find(child => child.id === "university-clubs")?.children || []
  const mainCouncil = data.children?.filter(child => !["school-clubs", "university-clubs"].includes(child.id)) || []

  return (
    <div className="w-full">
      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-4">
        {/* Left Column - School Club Presidents */}
        <div className="space-y-3">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md border border-blue-200 dark:border-blue-800">
            <h2 className="text-md font-bold text-blue-600 dark:text-blue-300">School Level Presidents</h2>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {schoolPresidents.map((president) => (
              <PresidentCard 
                key={president.id} 
                node={president} 
                type="school"
              />
            ))}
          </div>
        </div>

        {/* Middle Column - Main Council Structure */}
        <div className="space-y-4">
          <div className="bg-[#EE495C]/10 dark:bg-[#EE495C]/20 p-3 rounded-md border border-[#EE495C]/30 dark:border-[#EE495C]/40">
            <h2 className="text-lg font-bold text-[#EE495C] dark:text-[#EE495C]">Student Council</h2>
          </div>
          
          {/* Main Council Levels with Overflow */}
          <div className="max-h-[480px] overflow-y-auto space-y-4">
            {mainCouncil.map((tier) => (
              <div key={tier.id} className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {tier.children?.map((member) => (
                    <CouncilMemberCard 
                      key={member.id} 
                      node={member} 
                      tierColor={tier.id.replace('tier-', '')}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - University Club Presidents */}
        <div className="space-y-3">
          <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-md border border-green-200 dark:border-green-800">
            <h2 className="text-md font-bold text-green-600 dark:text-green-300">University Level Presidents</h2>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {universityPresidents.map((president) => (
              <PresidentCard 
                key={president.id} 
                node={president} 
                type="university"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Unified card component with dropdown toggle
const PresidentCard = ({ 
  node,
  type
}: { 
  node: OrgNode,
  type: "school" | "university"
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="flex flex-col">
      <motion.div
        className={cn(
          "rounded-md border p-3 shadow-xs transition-colors flex justify-between items-start",
          type === "school" 
            ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
            : "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
        )}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <div>
          <h3 className="font-medium text-sm">{node.name}</h3>
          <p className={cn(
            "text-xs mt-0.5",
            type === "school" 
              ? "text-blue-600 dark:text-blue-300"
              : "text-green-600 dark:text-green-300"
          )}>
            {node.title}
          </p>
        </div>
        {hasChildren && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>
        )}
      </motion.div>

      {hasChildren && isExpanded && (
        <div className="mt-1 pl-3 border-l-2 border-gray-200 dark:border-gray-700">
          <div className="space-y-1">
            {node.children?.map(child => (
              <div 
                key={child.id} 
                className="text-xs p-2 bg-gray-50 dark:bg-gray-800/30 rounded border border-gray-200 dark:border-gray-700"
              >
                <p className="font-medium">{child.name}</p>
                <p className="text-muted-foreground">{child.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Council member card with dropdown
const CouncilMemberCard = ({ node, tierColor }: { node: OrgNode, tierColor: string }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = node.children && node.children.length > 0

  const getTierColor = () => {
    switch (tierColor) {
      case "1": return "bg-[#EE495C]/10 dark:bg-[#EE495C]/20 border-[#EE495C]/30 dark:border-[#EE495C]/40"
      case "2": return "bg-purple-500/10 dark:bg-purple-900/20 border-purple-500/30 dark:border-purple-800/40"
      case "3": return "bg-amber-500/10 dark:bg-amber-900/20 border-amber-500/30 dark:border-amber-800/40"
      case "4": return "bg-teal-500/10 dark:bg-teal-900/20 border-teal-500/30 dark:border-teal-800/40"
      case "5": return "bg-pink-500/10 dark:bg-pink-900/20 border-pink-500/30 dark:border-pink-800/40"
      default: return "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    }
  }

  return (
    <div className="flex flex-col">
      <motion.div
        className={cn(
          "rounded-md border p-3 shadow-xs transition-colors flex justify-between items-start w-full h-[100px]",
          getTierColor()
        )}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex flex-col justify-center h-full">
          <h3 className="font-medium text-sm line-clamp-2">{node.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{node.title}</p>
        </div>
        {hasChildren && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground self-start"
          >
            {isExpanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>
        )}
      </motion.div>

      {hasChildren && isExpanded && (
        <div className="mt-1 pl-3 border-l-2 border-gray-200 dark:border-gray-700">
          <div className="space-y-1">
            {node.children?.map(child => (
              <div 
                key={child.id} 
                className="text-xs p-2 bg-gray-50 dark:bg-gray-800/30 rounded border border-gray-200 dark:border-gray-700"
              >
                <p className="font-medium">{child.name}</p>
                <p className="text-muted-foreground">{child.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrganizationChart