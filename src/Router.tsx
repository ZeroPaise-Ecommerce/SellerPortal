import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/products/Products";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import Messages from "./pages/Messages";
import GiftCards from "./pages/GiftCards";
import GiftCardDetail from "./pages/GiftCardDetail";
import Coupons from "./pages/Coupons";
import CouponDetail from "./pages/CouponDetail";
import MultiPlatform from "./pages/MultiPlatform";
import ProductReviews from "./pages/ProductReviews";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import PlaceholderPage from "./pages/PlaceholderPage";
import StorePOS from "./pages/StorePOS";
import CartCheckout from "./pages/CartCheckout";
import Settings from "./pages/Settings";
import General from "./pages/settings/General";
import Plans from "./pages/settings/Plans";
import UserRoles from "./pages/settings/UserRoles";
import PaymentIntegration from "./pages/settings/PaymentIntegration";
import Integrations from "./pages/settings/Integrations";
import ShippingControl from "./pages/settings/ShippingControl";
import RewardsControl from "./pages/settings/RewardsControl";
import Tracking from "./pages/settings/Tracking";
import SalesChannels from "./pages/settings/SalesChannels";
import Domains from "./pages/settings/Domains";
import Notification from "./pages/settings/Notification";
import Campaign from "./pages/marketing/Campaign";
import Automation from "./pages/marketing/Automation";
import SalesFunnel from "./pages/marketing/SalesFunnel";
import Affiliation from "./pages/marketing/Affiliation";
import WebsiteDesign from "./pages/platform-control/WebsiteDesign";
import AndroidApp from "./pages/platform-control/AndroidApp";
import IosApp from "./pages/platform-control/IosApp";
import NewOrder from "./pages/NewOrder";
import { BarChart2, PackageOpen, SettingsIcon, ShoppingCart } from "lucide-react";
import Addproducts from "./pages/products/AddProduct/AddProduct";
import Inventory from './pages/Inventory';
import Suppliers from './pages/inventory/purchase/Suppliers';
import PurchaseOrders from './pages/inventory/purchase/PurchaseOrders';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      {/* Main Routes with implemented pages */}
      <Route path="/products" element={<Products />} />
      <Route path="/products/addproducts" element={<Addproducts />} />
      <Route path="/products/:productId" element={<ProductDetails />} />
      <Route path="/products/add" element={<AddProduct />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:orderId" element={<OrderDetail />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/customers/:customerId" element={<CustomerDetail />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/gift-cards" element={<GiftCards />} />
      <Route path="/gift-cards/:giftCardId" element={<GiftCardDetail />} />
      <Route path="/coupons" element={<Coupons />} />
      <Route path="/coupons/:couponId" element={<CouponDetail />} />
      <Route path="/multi-platform" element={<MultiPlatform />} />
      <Route path="/product-reviews" element={<ProductReviews />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/storename/pos" element={<StorePOS />} />
      <Route path="/cart-checkout" element={<CartCheckout />} />
      <Route path="/inventory" element={<Inventory />} />

      {/* Inventory Sales Routes */}
          <Route path="/inventory/sales/customers" element={<Inventory />} />
          <Route path="/inventory/sales/orders" element={<Inventory />} />
          <Route path="/inventory/sales/invoices" element={<Inventory />} />
          <Route path="/inventory/sales/payments-in" element={<Inventory />} />
          <Route path="/inventory/sales/returns" element={<Inventory />} />
          <Route path="/inventory/sales/credit-notes" element={<Inventory />} />

      {/* Settings Routes */}
      <Route path="/settings" element={<Settings />}>
        <Route path="general" element={<General />} />
        <Route path="plans" element={<Plans />} />
        <Route path="user-roles" element={<UserRoles />} />
        <Route path="payment-integration" element={<PaymentIntegration />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="shipping-control" element={<ShippingControl />} />
        <Route path="rewards-control" element={<RewardsControl />} />
        <Route path="tracking" element={<Tracking />} />
        <Route path="sales-channels" element={<SalesChannels />} />
        <Route path="domains" element={<Domains />} />
        <Route path="notification" element={<Notification />} />
      </Route>
      {/* Marketing Routes */}
      <Route path="/marketing" element={<PlaceholderPage title="Marketing" icon={<BarChart2 />} />} />
      <Route path="/marketing/campaign" element={<Campaign />} />
      <Route path="/marketing/automation" element={<Automation />} />
      <Route path="/marketing/sales-funnel" element={<SalesFunnel />} />
      <Route path="/marketing/affiliation" element={<Affiliation />} />
      {/* Platform Control Routes */}
      <Route path="/platform-control" element={<PlaceholderPage title="Platform Control" icon={<Settings />} />} />
      <Route path="/platform-control/website-design" element={<WebsiteDesign />} />
      <Route path="/platform-control/android-app" element={<AndroidApp />} />
      <Route path="/platform-control/ios-app" element={<IosApp />} />
      {/* Placeholders for other pages */}
      <Route path="/inventory" element={<PlaceholderPage title="Inventory" icon={<PackageOpen />} />} />
      <Route path="/pos" element={<PlaceholderPage title="Point of Sale" icon={<ShoppingCart />} />} />
      <Route path="/settings-old" element={<PlaceholderPage title="Settings" icon={<SettingsIcon />} />} />
      {/* Add the route for the new order page */}
      <Route path="/new-order" element={<NewOrder />} />
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;