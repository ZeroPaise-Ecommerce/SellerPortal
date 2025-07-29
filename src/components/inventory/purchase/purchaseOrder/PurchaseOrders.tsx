
import React, { useState } from "react";
import PurchaseOrdersTable from "./PurchaseOrdersTable";
import CreatePurchaseOrder from "./CreatePurchaseOrder";
import PurchaseOrderView from "./PurchaseOrderView";
import { useDispatch } from 'react-redux';
import { getPurchaseOrderRequest } from '@/store/Inventory/purchase/actions';

type ViewMode = 'table' | 'create' | 'edit' | 'view';

const PurchaseOrders = () => {
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');

  const handleCreatePO = () => {
    setViewMode('create');
  };

  const handleEditPO = (orderId: string) => {
    setSelectedOrderId(orderId);
    setViewMode('edit');
  };

  const handleViewPO = (orderId: string) => {
    setSelectedOrderId(orderId);
    setViewMode('view');
  };

  const handleClose = () => {
    setViewMode('table');
    setSelectedOrderId('');
    dispatch(getPurchaseOrderRequest());
  };

  const handleEdit = () => {
    setViewMode('edit');
  };

  switch (viewMode) {
    case 'create':
      return <CreatePurchaseOrder onClose={handleClose} />;
    case 'edit':
      return <CreatePurchaseOrder onClose={handleClose} isEdit={true} orderId={selectedOrderId} />;
    case 'view':
      return <PurchaseOrderView orderId={selectedOrderId} onClose={handleClose} onEdit={handleEdit} />;
    default:
      return (
        <PurchaseOrdersTable 
          onCreatePO={handleCreatePO}
          onViewPO={handleViewPO}
          onEditPO={handleEditPO}
        />
      );
  }
};

export default PurchaseOrders;
