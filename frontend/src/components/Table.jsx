import "../styles/Table.css"
import "../styles/General.css"

function Table({ data }) {
    return (
        <div className="table-container">
          <h3 className="table-title">Entrenamientos de los últimos 3 días</h3>
          {data.length > 0 ? (  
          <table className="table">
            <thead>
              <tr>
                <th className="table-th">Título</th>
                <th className="table-th">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="table-tr">
                  <td className="table-td">{item.title}</td>
                  <td className="table-td">{new Date(item.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>) : (<p className="table-empty-message">No hay entrenamientos disponibles</p>)}
        </div>
    );
  }
  
  export default Table;
  