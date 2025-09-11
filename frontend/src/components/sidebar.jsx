import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { AddBlock, Blocks, Close, Dashboard, Hamburger2 } from '../assets';
import React, { useEffect } from 'react';
import { Tabs, Tab } from "@heroui/tabs";
import { UseDashboardStore } from '../stores/dashboard';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@heroui/theme';
import { Button } from '@heroui/button';

export const SideBar = () => {
    const nav = useNavigate();
    const collapsible = UseDashboardStore(e => e.menuExpanded);
    const setDashboard = UseDashboardStore(e => e.setDashboard);
    const location = useLocation();
    const menu = [
        {
            label:"DashBoard",
            link:"dashboard",
            icon: <Dashboard/>
        },
        {
            label: "View Blocks",
            link:"displayBlocks",
            icon: <Blocks/>
        },
        {
            label: "Add Block",
            link: "addBlock",
            icon: <AddBlock/>
        }
    ];

    const routes = [
        {
            label:"dashboard",
            routes: ["dashboard"]
        },
        {
            label:"displayBlocks",
            routes: ["displayBlocks","editBlock"]
        },
        {
            label:"addBlock",
            routes: ["addBlock"]
        }
    ];

    const currentLocation = location?.pathname.split("/")[2];
    const selectedKey = routes.find(item => item.routes.includes(currentLocation));

  return (
      <Sidebar collapsedWidth="55px" 
        rootStyles={{
            height:"100%"
        }}
       menuItemStyles={ {
            padding:"0px 10px",
        }}
        width='200px'
      collapsed={collapsible}>
        <div className={cn('flex justify-end relative w-full mt-2 rounded-lg p-2',{
        })}>
              <span className='cursor-pointer relative pr-1' onClick={() => setDashboard("menuExpanded", !collapsible)}>
                  <span className={cn('opacity-0 transition-all duration-300 absolute',{
                        "opacity-100" : !collapsible
                    })}>
                    <Close width={28} height={28} />
                    </span>
                  <span className={cn('opacity-0 transition-all duration-300', {
                      "opacity-100": collapsible
                  })}>
                    <Hamburger2 width={28} height={28} />
                    </span>
              </span>
        </div>
        <div>        
        <div>
       <Tabs 
       selectedKey={selectedKey?.label}
       placement='start'
       className='w-full mt-4'
       classNames={{
        tabWrapper:"w-full",
        tabList:"w-full bg-transparent",
        tab:'w-full h-12 justify-start pl-2.5 font-medium text-custom-300 text-base',
       }}
       >
            {menu.map((item) => (
          
                <Tab
                key={item.link} title={
                    <div className='flex items-center gap-4'>
                        <span>
                            {item.icon}
                            </span><span>
                                {item?.label}
                            </span>
                    </div>
                } 
                onClick={() => nav(item?.link)}
              >
             
              </Tab>
            ))}
          </Tabs>
          </div>
        
          </div>

                  </Sidebar>
  )
}
