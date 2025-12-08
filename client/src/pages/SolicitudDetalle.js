import {React, useParams} from "../Facade/AppFacade";
import SolicitudViewer from "../components/Solicitud/SolicitudViewer";


const SolicitudDetalle = () => {
  const { id } = useParams();

  return (
    <div>
      <SolicitudViewer solicitudId={id} />
    </div>
  );
};

export default SolicitudDetalle;