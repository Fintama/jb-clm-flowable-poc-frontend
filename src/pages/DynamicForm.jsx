import { useEffect, useState } from "react";
import "../App.css";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import axios from "axios";
import { Divider, Typography } from "@mui/material";

function DynamicForm() {
  //https://github.com/rjsf-team/react-jsonschema-form/issues/3258

  const [schema, setSchema] = useState(undefined);
  const [processId, setProcessId] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const serviceId = window.location.pathname.split("/")[2];

  const fetchData = async () => {
    //get the service id from the url
    const productConfigRes = await axios.post(
      "http://localhost:8080/product-configuration/" + serviceId,
      {}
    );

    const processId = productConfigRes.data;

    //call get agreements with processid
    const res = await axios.get(
      "http://localhost:8080/product-configuration/" + processId + "/task"
    );
    setSchema(res.data);

    setProcessId(processId);

    //call /product-configuration with processId
    const result = await axios.get(
      "http://localhost:8080/product-configuration/" + processId
    );
    setStatus(result.data.status);
    console.log(result);
  };

  const onSubmit = async (e) => {
    if (status !== "READY_FOR_CONFIGURATION") return;

    console.log("🚀 ~ file: DynamicForm.jsx:40 ~ onSubmit ~ e", e);
    const formData = e.formData;
    await axios.post(
      "http://localhost:8080/product-configuration/" + processId + "/configure",
      formData
    );

    const res = await axios.get(
      "http://localhost:8080/product-configuration/" + processId
    );
    setStatus(res.data.status);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Typography align="center" variant="h2">
        Product Configuration
      </Typography>
      <Divider className="divider"/>
      <Typography align="center" variant="h4">
        Service Agreement Status: {status}
      </Typography>
      <Divider className="divider" variant="inset" component="h1" />
      {schema ? (
        <div className="card">
          <Form
            schema={schema}
            onSubmit={(e) => onSubmit(e)}
            onChange={console.log("onChange called")}
            onError={(e) => console.log("error: ", e)}
            validator={validator}
            disabled={status !== "READY_FOR_CONFIGURATION"}
            children={status !== "READY_FOR_CONFIGURATION" ? true : false}
          />
        </div>
      ) : undefined}
    </div>
  );
}

export default DynamicForm;
