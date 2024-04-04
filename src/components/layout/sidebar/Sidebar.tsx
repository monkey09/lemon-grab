"use client"

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Sidebar = () => {
  const pathname = usePathname().split("/")[2]
  
  const links = [
    {
      link: '',
      title: 'الرئيسية'
    },
    {
      link: 'governorates',
      title: 'المحافظات',
      links: [
        {
          link: '#ci',
          title: 'المحافظات',
        },
        {
          link: '/cities',
          title: 'المدن',
        },
      ]
    }
  ]

  return (
    <Accordion type="single" collapsible className="w-full" value={pathname || ''}>
      {links.map(item => (
        <AccordionItem key={item.link} value={item.link}>
          <Link href={`/${item.link}`}>
            <AccordionTrigger className="px-3" icon={!!item.links}>
              {item.title}
            </AccordionTrigger>
          </Link>
          {item.links && (
            <AccordionContent className="mx-5 border-r pb-0 mb-4">
              {item.links.map(subItem => (
                <Link key={subItem.link} href={`/${item.link}/${subItem.link}`} className="block hover:underline mb-3 mr-4">
                  {subItem.title}
                </Link>
              ))}
            </AccordionContent>
          )}
        </AccordionItem>  
      ))}
    </Accordion>
  )
}