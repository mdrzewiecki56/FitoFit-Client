import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {AutoComplete, Button, Form, Input, Row} from "antd";

import actions from "../../api/walkActions";
import useDebounce from "../../hooks/useDebounce";

const WalkForm: React.FC = () => {
    const history = useHistory();

    const [startLocation, setStartLocation] = useState<string>("");
    const [finishLocation, setFinishLocation] = useState<string>("");
    const [startQuery, setStartQuery] = useState<string>("");
    const [finishQuery, setFinishQuery] = useState<string>("");
    const [availableStartOptions, setAvailableStartOptions] = useState<{ value: string }[]>([]);
    const [availableFinishOptions, setAvailableFinishOptions] = useState<{ value: string }[]>([]);
    const [distance, setDistance] = useState<number|string>(0);
    const [userLocation, setUserLocation] = useState([0,0]);
    const debouncedStartQuery = useDebounce(startQuery, 500);
    const debouncedFinishQuery = useDebounce(finishQuery, 500);

    const handleSubmit = () => {
        if (startLocation.length && finishLocation.length) {
            actions.addWalk(startLocation, finishLocation).then(() =>
            history.push("/statistics"));
        }
    };

    useEffect(() => {
        if (debouncedStartQuery.length) {
            actions.autocomplete(debouncedStartQuery, userLocation).then(({locations}) => 
                setAvailableStartOptions(locations.map((opt:string) => ({value: opt})))
            );
        }
    },[debouncedStartQuery, userLocation]);

    useEffect(() => {
        if (debouncedFinishQuery.length) {
            actions.autocomplete(debouncedFinishQuery, userLocation).then(({locations}) => 
                setAvailableFinishOptions(locations.map((opt:string) => ({value: opt})))
            );
        }
    }, [debouncedFinishQuery, userLocation]);
    useEffect(() => {
        if (startLocation && finishLocation) {
            setDistance("Calculating...");
            actions.calculateDistance(startLocation,finishLocation).then(r =>
                setDistance(r.distance)
            );
        }
    }, [startLocation, finishLocation]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]));
    }, []);

    return (
            <Form
            className="WalkForm"
            layout="vertical"
      
    >
      <Form.Item label="Starting point">
        <AutoComplete
            onSearch={(q) => setStartQuery(q)}
            onSelect={(v) => setStartLocation(v)}
            options={availableStartOptions}
            placeholder="21 Long Street"
        />
      </Form.Item>
      <Form.Item label="Finish point">
        <AutoComplete
            onSearch={(q) => setFinishQuery(q)}
            onSelect={(v) => setFinishLocation(v)}
            options={availableFinishOptions}
            placeholder="12 Short Street"
        />
      </Form.Item>
      <Form.Item
        label="Calculated distance"
      >
        <Input 
            disabled
            placeholder="Distance will appear after properly selected locations" 
            value={typeof distance === "number" ? `${distance}km` : distance}
        />
      </Form.Item>
      <Form.Item>
          <Row justify="end">
            <Button onClick={handleSubmit} type="primary">Submit</Button>
          </Row>
      </Form.Item>
    </Form>
    );
};

export default WalkForm;