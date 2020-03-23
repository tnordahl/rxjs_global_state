import 'react-hot-loader'
import React from "react";
import { hydrate } from "react-dom";
import App from "../shared/App";
import './styles/global.scss';

hydrate(<App />, document.getElementById("root"));
