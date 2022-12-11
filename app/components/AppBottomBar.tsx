"use client";
import { BaseBottomBar, NavLink } from "app/components";

import {
  HomeIcon,
  MagnifyingGlassIcon,
  RocketIcon,
  BellIcon, HamburgerMenuIcon
} from "@radix-ui/react-icons";

export default function AppBottomBar() {
  return (
    <BaseBottomBar className="px-8">
      <NavLink href="/home">
        <HomeIcon className="h-5 w-5" />
      </NavLink>
      <NavLink href="/search">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </NavLink>
      <NavLink href="/trending">
        <RocketIcon className="h-5 w-5" />
      </NavLink>
      <NavLink href="/notifications">
        <BellIcon className="h-5 w-5" />
      </NavLink>
      <NavLink href="/menu">
        <HamburgerMenuIcon className="h-5 w-5" />
      </NavLink>
    </BaseBottomBar>
  );
}
