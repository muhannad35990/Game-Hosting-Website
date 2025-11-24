import React from "react"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import FiltersContent from "../games/FiltersContent"

function MobileMenu() {
  return (
    <div>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <FiltersContent />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default MobileMenu
