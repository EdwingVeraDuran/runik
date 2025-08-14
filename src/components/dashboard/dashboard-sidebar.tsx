import NavMain from "@/components/dashboard/nav-main";
import NavSecondary from "@/components/dashboard/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Bell,
  Bookmark,
  ChartColumn,
  CoffeeIcon,
  FileText,
  Logs,
  Receipt,
  ShoppingBag,
  Store,
  Tag,
  Truck,
  Users,
  Wallet,
  Warehouse,
} from "lucide-react";

const data = {
  navMain: [
    {
      title: "Inicio",
      url: "/dashboard",
      icon: Store,
    },
    {
      title: "Estadisticas",
      url: "/dashboard/analytics",
      icon: ChartColumn,
    },
    {
      title: "Notificaciones",
      url: "/dashboard/alerts",
      icon: Bell,
    },
    {
      title: "Finanzas",
      url: "/dashboard/finances",
      icon: Wallet,
    },
    {
      title: "Reportes",
      url: "/dashboard/reports",
      icon: FileText,
    },
    {
      title: "Historial",
      url: "/dashboard/history",
      icon: Logs,
    },
  ],
  navInventory: [
    {
      title: "Productos",
      url: "/dashboard/products",
      icon: ShoppingBag,
    },
    {
      title: "Categorías",
      url: "/dashboard/categories",
      icon: Bookmark,
    },
    {
      title: "Marcas",
      url: "/dashboard/brands",
      icon: Tag,
    },
    {
      title: "Proveedores",
      url: "/dashboard/suppliers",
      icon: Warehouse,
    },
    {
      title: "Pedidos",
      url: "/dashboard/supplier-orders",
      icon: Truck,
    },
  ],
  navSales: [
    {
      title: "Clientes",
      url: "/dashboard/clients",
      icon: Users,
    },
    {
      title: "Ordenes",
      url: "/dashboard/clients-orders",
      icon: Receipt,
    },
  ],
};

export default function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href="#">
              <CoffeeIcon className="!size-5" />
              <span className="text-base font-semibold">Runik Inc.</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary label="Inventario" items={data.navInventory} />
        <NavSecondary label="Ventas" items={data.navSales} />
      </SidebarContent>
    </Sidebar>
  );
}
