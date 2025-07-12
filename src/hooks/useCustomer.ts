import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  createCustomerRequest,
  getCustomersRequest,
  getCustomerByIdRequest,
  updateCustomerRequest,
  deleteCustomerRequest
} from '../store/Inventory/customer/actions';
import { Customer } from '../store/Inventory/customer/types';
import { CreateCustomerDto, UpdateCustomerDto } from '../types/customer';

export const useCustomer = () => {
  const dispatch = useDispatch();
  const customerState = useSelector((state: RootState) => state.customer);

  // Actions
  const createCustomer = useCallback((customerData: CreateCustomerDto) => {
    dispatch(createCustomerRequest(customerData as Customer));
  }, [dispatch]);

  const getCustomers = useCallback(() => {
    dispatch(getCustomersRequest());
  }, [dispatch]);

  const getCustomerById = useCallback((customerId: number) => {
    dispatch(getCustomerByIdRequest(customerId));
  }, [dispatch]);

  const updateCustomer = useCallback((customerData: UpdateCustomerDto) => {
    dispatch(updateCustomerRequest(customerData as Customer));
  }, [dispatch]);

  const deleteCustomer = useCallback((customerId: number) => {
    dispatch(deleteCustomerRequest(customerId));
  }, [dispatch]);

  // Selectors
  const customers = customerState.customers;
  const loading = customerState.loading;
  const error = customerState.error;
  const stageCompleted = customerState.stageCompleted;

  // Helper functions
  const getCustomerByIdFromState = useCallback((customerId: number) => {
    return customers.find(customer => customer.customerId === customerId);
  }, [customers]);

  const getCustomersByCompany = useCallback((companyName: string) => {
    return customers.filter(customer => 
      customer.companyName.toLowerCase().includes(companyName.toLowerCase())
    );
  }, [customers]);

  const getCustomersByEmail = useCallback((email: string) => {
    return customers.filter(customer => 
      customer.emailAddress.toLowerCase().includes(email.toLowerCase())
    );
  }, [customers]);

  const getCustomersByMobile = useCallback((mobile: string) => {
    return customers.filter(customer => 
      customer.mobileNumber.includes(mobile)
    );
  }, [customers]);

  return {
    // State
    customers,
    loading,
    error,
    stageCompleted,
    
    // Actions
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    
    // Helper functions
    getCustomerByIdFromState,
    getCustomersByCompany,
    getCustomersByEmail,
    getCustomersByMobile
  };
}; 