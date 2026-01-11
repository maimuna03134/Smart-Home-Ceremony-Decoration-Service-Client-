import React from 'react'
import { AiTwotoneSchedule } from 'react-icons/ai'
import { FaMoneyBillWave } from 'react-icons/fa'
import { GrDocumentUpdate } from 'react-icons/gr'
import { LuProjector } from 'react-icons/lu'
import { Link } from 'react-router'
import { useTheme } from '../../../contexts/ThemeContext'

export default function DecoratorMenu() {
    const { isDark } = useTheme();
    
    return (
        <div>
            <ul>
                <li>
                    <Link
                        to="/dashboard/my-project"
                        className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                          isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : ''
                        }`}
                        data-tip="My Project"
                    >
                        <LuProjector />
                        <span className="is-drawer-close:hidden">My Project</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard/today-schedule"
                        className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                          isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : ''
                        }`}
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
                        className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                          isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : ''
                        }`}
                        data-tip="Update Project Status"
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
                        className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                          isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : ''
                        }`}
                        data-tip="Earnings Summary"
                    >
                        <FaMoneyBillWave />
                        <span className="is-drawer-close:hidden">
                            Earnings Summary
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
