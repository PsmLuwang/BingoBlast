import { Navigate, Link, useSearchParams  } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTicketStore } from "../store/ticketStore";

const AdminRoute = ({ children }) => {
  const { viewTickets, role, isLoading } = useTicketStore();
  const [checked, setChecked] = useState(false);
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  // Only call API once
  useEffect(() => {
    const checkAdmin = async () => {
      if (code) {
        await viewTickets(code); // pass the code from the URL
      }
    };
    setChecked(true);
    checkAdmin();
  }, [viewTickets]);


  if (!checked || isLoading) {
    return <div className="text-center mt-20 text-lg">Checking admin access...</div>;
  }

  
  if (role !== "admin") {
    return (
      <section className="text-center">
        <div className="my-20 text-lg text-red-500">Admin access denied!</div>
        <Link to="/" className="bg-blue-500 text-slate-900 px-3 py-2 rounded-md font-medium text-[0.8rem]">Back to Home</Link>
      </section>
    );
  }

  return children;
};

export default AdminRoute;
