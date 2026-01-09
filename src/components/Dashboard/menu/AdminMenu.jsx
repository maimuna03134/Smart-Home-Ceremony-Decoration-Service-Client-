import React from 'react'
import { FaChartBar, FaUserTag } from 'react-icons/fa'
import { GrServices } from 'react-icons/gr'
import { MdAdminPanelSettings, MdOutlineAssignmentInd } from 'react-icons/md'
import { Link } from 'react-router'

export default function AdminMenu() {
  return (
    <div>
          <ul>

              <li>
                  <Link
                      to="/dashboard/manage-services"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Manage Services"
                  >
                      <GrServices />
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
                      data-tip="Manage Bookings"
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
                      data-tip="Manage Decorator"
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
                      data-tip="Assign Decorator"
                  >
                      <MdOutlineAssignmentInd />
                      <span className="is-drawer-close:hidden">
                          Assign Decorator
                      </span>
                  </Link>
              </li>
              <li>
                  <Link
                      to="/dashboard/analytics"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Analytics Charts"
                  >
                      <FaChartBar />
                      <span className="is-drawer-close:hidden">
                          Analytics Charts
                      </span>
                  </Link>
              </li>
      </ul>
    </div>
  )
}
