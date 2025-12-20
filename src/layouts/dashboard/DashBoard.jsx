import React from "react";
import { FiHome } from "react-icons/fi";
import { LuProjector, LuSettings } from "react-icons/lu";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { Link, Outlet } from "react-router";
import { BsFillMenuButtonFill } from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoBagAdd } from "react-icons/io5";
import { FaMoneyBillWave, FaUserAlt, FaUsers, FaUserTag } from "react-icons/fa";
import useRole from "../../hooks/useRole";
import Loader from "../../pages/shared/loader/Loader";
import { AiTwotoneSchedule } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";


const DashBoard = () => {
  const [role, isRoleLoading] = useRole();
  
if(isRoleLoading) return <Loader/>

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <TbLayoutSidebarRightExpandFilled />
          </label>
          <div className="px-4">StyleDecor Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <FiHome />
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* ===== USER ===== */}
            {role === "customer" && (
              <>
                <li>
                  <Link
                    to="/dashboard/profile"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Settings"
                  >
                    <FaUserAlt />
                    <span className="is-drawer-close:hidden">My Profile</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/my-bookings"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Settings"
                  >
                    <BsFillMenuButtonFill />
                    <span className="is-drawer-close:hidden">My Bookings</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/payment-history"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Settings"
                  >
                    <FaRegCreditCard />
                    <span className="is-drawer-close:hidden">
                      Payment History
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* ===== DECORATOR ===== */}
            {role === "decorator" && (
              <>
                <li>
                  <Link
                    to="/dashboard/my-project"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Project"
                  >
                    <LuProjector />
                    <span className="is-drawer-close:hidden">My Project</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/today-schedule"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Today's Schedule"
                  >
                    <AiTwotoneSchedule />
                    <span className="is-drawer-close:hidden">
                      Today's Schedule
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/update-project"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Update Project Status
"
                  >
                    <GrDocumentUpdate />
                    <span className="is-drawer-close:hidden">
                      Update Project Status
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/decorator-earning"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Earnings Summary

"
                  >
                    <FaMoneyBillWave />
                    <span className="is-drawer-close:hidden">
                      Earnings Summary
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* ===== ADMIN ===== */}
            {role === "admin" && (
              <>
                {/* <li>
                  <Link
                    to="/dashboard/add-service"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Settings"
                  >
                    <IoBagAdd />
                    <span className="is-drawer-close:hidden">Add Service</span>
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/dashboard/manage-services"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Settings"
                  >
                    <FaUsers />
                    <span className="is-drawer-close:hidden">
                      {" "}
                      Manage Services
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/manage-bookings"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Settings"
                  >
                    <MdAdminPanelSettings />
                    <span className="is-drawer-close:hidden">
                      Manage Bookings
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/decorator"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Settings"
                  >
                    <FaUserTag />
                    <span className="is-drawer-close:hidden">
                      Manage Decorator
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/assign-decorator"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Settings"
                  >
                    <FaUserTag />
                    <span className="is-drawer-close:hidden">
                      Assign Decorator
                    </span>
                  </Link>
                </li>
              </>
            )}

            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <LuSettings />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
