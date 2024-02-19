import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const staticData = [
  {
    _id: "1",
    amount: 100,
    quantity: 2,
    discount: 10,
    status: <span className="red">Processing</span>,
    action: <Link to="/admin/transaction/1">Manage</Link>,
  },
  {
    _id: "2",
    amount: 150,
    quantity: 3,
    discount: 15,
    status: <span className="green">Shipped</span>,
    action: <Link to="/admin/transaction/2">Manage</Link>,
  },
  // Add more static data as needed
];

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {
  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    // Load static data
    setRows(staticData);
  }, []);

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();

  return (
    <div className="container">
      <h1>My Orders</h1>
      {/* <Skeleton length={20} /> Placeholder for skeleton loading */}
      {/* {isLoading ? <Skeleton length={20} /> : Table} */}
      {Table}
    </div>
  );
};

export default Orders;
