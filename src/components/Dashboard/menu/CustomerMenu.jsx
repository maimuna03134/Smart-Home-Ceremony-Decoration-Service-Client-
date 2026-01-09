import React from 'react'
import { BsFillMenuButtonFill } from 'react-icons/bs'
import { FaRegCreditCard, FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router'

export default function CustomerMenu() {
  return (
    <div>
          <ul>
              <li>
                  <Link
                      to="/dashboard/profile"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="My Profile"
                  >
                      <FaUserAlt />
                      <span className="is-drawer-close:hidden">My Profile</span>
                  </Link>
              </li>

              <li>
                  <Link
                      to="/dashboard/my-bookings"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="My Bookings"
                  >
                      <BsFillMenuButtonFill />
                      <span className="is-drawer-close:hidden">My Bookings</span>
                  </Link>
              </li>

              <li>
                  <Link
                      to="/dashboard/payment-history"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Payment History"
                  >
                      <FaRegCreditCard />
                      <span className="is-drawer-close:hidden">
                          Payment History
                      </span>
                  </Link>
              </li>
      </ul>
    </div>
  )
}
