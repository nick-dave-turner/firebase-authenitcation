/* istanbul ignore file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { lazy } from "react";
import { RoutingProps } from "../components";

export const routerConfig: RoutingProps[] = [
  {
    component: lazy(() => import("../pages/home")),
    path: "/home",
    title: "Home",
  },
  {
    component: lazy(() => import("../pages/private")),
    path: "/private",
    title: "Hidden",
  },
];
