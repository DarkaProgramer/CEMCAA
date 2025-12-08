// ===============================
//         FACADE GLOBAL
// ===============================

// 🔵 React y hooks comunes
import React from "react";
import { useState, useEffect, useCallback } from "react";
// 🔵 React Router DOM
import {BrowserRouter, Routes, Route, NavLink, useNavigate, useParams} from "react-router-dom";

// 🔵 React-Bootstrap componentes
import {Container, Row, Col, Card, Button, Form, Alert, Image, Table, Badge, Spinner} 
from "react-bootstrap";

// 🔵 Axios (instancia configurada)
import axios from "../config/axios";

// 🔵 SweetAlert2
import Swal from "sweetalert2";

// 🔵 Íconos FontAwesome usados en App.js
import {FaPaw, FaDog, FaBars, FaTimes, FaUsers, FaClipboardList, FaTasks, FaSignOutAlt, 
        FaPlusCircle, FaExclamationTriangle, FaEnvelopeOpenText,} 
from "react-icons/fa";

// =======================================================
// 🟣 EXPORTAMOS TODO DESDE AQUÍ 
// =======================================================
export {
  // React
  React, useState, useEffect, useCallback, 

  // Router
  BrowserRouter, Routes, Route, NavLink, useNavigate, useParams, 
  
  // UI Bootstrap
  Container, Row, Col, Card, Button, Form, Alert, Image, Table, Badge, Spinner,

  // Axios
  axios,

  // SweetAlert
  Swal,

  // Icons
  FaPaw, FaDog, FaBars, FaTimes, FaUsers, FaClipboardList, FaTasks, FaSignOutAlt, 
  FaPlusCircle, FaExclamationTriangle, FaEnvelopeOpenText,};
