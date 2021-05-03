import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { DatePicker, Table, Tabs, Typography} from "antd";
import locale from 'antd/es/date-picker/locale/en_GB';
import 'moment/locale/en-gb';
import moment from "moment";

import actions from "../../api/statisticsActions";

import "./Statistics.scss";

const Statistics: React.FC = () => {
    const params:any = useParams();
    const history = useHistory();

    const [weeklySummary, setWeeklySummary] = useState({walks:[], distance_sum: 0, total: 0});
    const [monthlySumary, setMonthlySummary] = useState({
        walks:[], 
        distance_sum: 0, 
        total: 0
    });
    const [dateForStats, setDateForStats] = useState(moment());
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const weeklySummaryColumns:{key: string, title:string, dataIndex:string}[] = [
        {
            key: "start_address",
            title: "Start Address",
            dataIndex: "start_address"
        },
        {
            key: "end_address",
            title: "End Address",
            dataIndex: "end_address"
        },
        {
            key: "distance",
            title: "Distance",
            dataIndex: "distance"
        }
    ];

    const monthlySummaryColumns = [
        {
            key: "date",
            title: "Day",
            dataIndex: "day"
        },
        {
            key: "distance",
            title: "Distance",
            dataIndex: "distance"
        }
    ];

    useEffect(() => {
        switch(params.activeTab) {
            case 'weekly_summary':
                actions.getWalksWeeklySummary(dateForStats, page, 10).then(r => {
                    setWeeklySummary(r.summary);
                    setTotal(r.summary.total);
                });
                break;
            case 'monthly_summary':
               actions.getWalksMonthlySummary(dateForStats, page, 10).then(r => {  
                const walksInFormat: {day:string, distance:unknown}[] = [];
                Object.entries(r.summary.walks).forEach((entry) => {
                    walksInFormat.push({day: entry[0], distance: entry[1]});
                });
                setMonthlySummary({...r.summary, walks: walksInFormat});
                    setTotal(r.summary.total);
               });
                break; 
            default:
                history.push("/statistics/weekly_summary");
        }
    }, [params.activeTab, history, dateForStats, page]);

    return (
        <div className="Statistics">
              <div className="card-container">
                <Tabs 
                    activeKey={params.activeTab}
                    defaultActiveKey="weekly_summary" 
                    onChange={(tabKey:string)=> history.push(`/statistics/${tabKey}`)}  
                    type="card"
                >
                    <Tabs.TabPane className="Statistics__tab Statistics__weeklySummary" key="weekly_summary" tab="Weekly Summary">
                        <Table
                            columns={weeklySummaryColumns} 
                            dataSource={weeklySummary.walks}  
                            footer={()=>(
                                    <DatePicker 
                                        locale={locale}
                                        onChange={(v)=>v && setDateForStats(v)} 
                                        picker="week" 
                                        value={dateForStats} 
                                    />
                                )}
                            pagination={{total, 
                                pageSize: 10, 
                                current: page,
                                onChange: setPage
                            }}
                            summary={()=> (
                                        <Table.Summary.Row>
                                            <Table.Summary.Cell colSpan={2} index={0}>
                                                <Typography.Text strong>Total Distance</Typography.Text>
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell colSpan={2} index={1}>
                                                <Typography.Text strong>{weeklySummary.distance_sum}</Typography.Text>
                                            </Table.Summary.Cell>
                                        </Table.Summary.Row>
                            )}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="monthly_summary" tab="Monthly Summary">
                        <Table
                            columns={monthlySummaryColumns} 
                            dataSource={monthlySumary.walks}  
                            footer={()=>(
                                    <DatePicker 
                                        locale={locale}
                                        onChange={(v)=>v && setDateForStats(v)} 
                                        picker="month" 
                                        value={dateForStats} 
                                    />
                                )}
                            pagination={{total, 
                                pageSize: 10, 
                                current: page,
                                onChange: setPage
                            }}
                            summary={()=> (
                                        <Table.Summary.Row>
                                            <Table.Summary.Cell colSpan={1} index={0}>
                                                <Typography.Text strong>Total Distance</Typography.Text>
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell colSpan={1} index={1}>
                                                <Typography.Text strong>{monthlySumary.distance_sum}</Typography.Text>
                                            </Table.Summary.Cell>
                                        </Table.Summary.Row>
                            )}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default Statistics;