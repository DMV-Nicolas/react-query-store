import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import "./index.css"
import { router } from "./router/router.tsx"

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </main>
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
