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
}

interface OrganizationChartProps {
  data: OrgNode
}

const OrganizationChart = ({ data }: OrganizationChartProps) => {
  return (
    <div className="flex justify-center">
      <OrgNode node={data} level={0} isRoot />
    </div>
  )
}

interface OrgNodeProps {
  node: OrgNode
  level: number
  isRoot?: boolean
}

const OrgNode = ({ node, level, isRoot = false }: OrgNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = node.children && node.children.length > 0

  const toggleExpand = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded)
    }
  }

  // Different styles based on level
  const getNodeStyle = () => {
    if (isRoot) {
      return "bg-[#EE495C] text-white border-[#EE495C]"
    }

    switch (level) {
      case 1:
        return "bg-primary/10 text-primary border-primary/30"
      case 2:
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
      case 3:
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30"
      default:
        return "bg-muted text-muted-foreground border-muted-foreground/30"
    }
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={cn(
          "relative cursor-pointer rounded-lg border-2 p-4 text-center shadow-sm transition-colors",
          getNodeStyle(),
          hasChildren ? "cursor-pointer" : "cursor-default",
        )}
        onClick={toggleExpand}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        layout
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <h3 className="font-bold">{node.name}</h3>
          <p className="text-sm opacity-90">{node.title}</p>
          {hasChildren && (
            <button
              className="absolute right-2 top-2 rounded-full p-1 hover:bg-black/10"
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          )}
        </div>
      </motion.div>

      {hasChildren && isExpanded && (
        <div className="mt-4 flex flex-col items-center">
          <div className="h-6 w-px bg-border"></div>
          <div className="flex flex-wrap justify-center gap-6">
            {node.children!.map((child, index) => (
              <div key={child.id} className="flex flex-col items-center">
                {index > 0 && level === 0 && <div className="h-6 w-px bg-border"></div>}
                <OrgNode node={child} level={level + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrganizationChart

