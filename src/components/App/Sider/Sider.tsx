import React from "react";
import {useHistory} from "react-router-dom";

import {LineChartOutlined, NodeIndexOutlined, PlusOutlined } from "@ant-design/icons";
import {Layout, Menu, Typography} from "antd";

import "./Sider.scss";

const Sider: React.FC = () => {
    const history = useHistory();
    const menuItems: {url: string, title:string, icon: any}[] = [
        {url: "/new-walk", title: "Add walk", icon: <PlusOutlined/>},
        {url: "/statistics/weekly_summary", title: "Statistics", icon: <LineChartOutlined/>}
    ];
    const navigate = (url:string) => history.push(url);
    return (
            <Layout.Sider
            breakpoint="lg"
            className="Sider"
            collapsedWidth="0"
            theme="light"
            >
            <Menu mode="inline">
                <div className="Sider__logo">
                    <Typography.Title level={5}>
                        <NodeIndexOutlined className="Sider__logo__image" />
                        FitoFit
                    </Typography.Title>   
                </div>
                {
                    menuItems.map(mI => (
                        <Menu.Item 
                            key={mI.url}
                            onClick={() => navigate(mI.url)}
                        >
                            {mI.icon}
                            {mI.title}
                        </Menu.Item>
                    ))
                }
            </Menu>
            </Layout.Sider>
    );
};

export default Sider;