import Menu from "../components/Menu";
import TableRow from "../components/TableRow";

function InfoTable() {
  return (
    <div className="flex flex-col bg-gray-900 gap-[80px] h-screen ">
      <Menu />
      <main className="flex flex-col items-center ">
        <div className="w-[70%] flex flex-col gap-4 ">
          <TableRow name="VALE UM CORDÃO DE CRACHÁ" coin="9" />
          <TableRow name="1 VALE-REFEIÇÃO" coin="18" />
          <TableRow name="CURSO UDEMY DE ATÉ R$50" coin="22" />
          <TableRow name="TROCAR MOUSE OU TECLADO" coin="34" />
          <TableRow name="DIA DE PIZZA NA EMPRESA" coin="50" />
          <TableRow
            name="TERÇA, QUARTA OU QUINTA(NÃO SENDO PRÉ/PÓS FERIADO DE FOLGA)"
            coin="57"
          />
          <TableRow name="MEIO PERÍODO DE FOLGA" coin="65" />
          <TableRow name="VALE PRESENTE SMASH CARD R$100,00" coin="78" />
          <TableRow
            name="SEGUNDA, SEXTA OU DIA PRÉ/PÓS FERIADO DE FOLGA"
            coin="83"
          />
          <TableRow
            name="VALE UM JANTAR BATEL GRILL + CARTA DE RECONHECIMENTO"
            coin="100"
          />
        </div>
      </main>
    </div>
  );
}

export default InfoTable;
