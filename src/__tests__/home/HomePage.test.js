import {render, screen} from '@testing-library/react'//Render nos permite indicar que compoenente queremos renderizar y screen escoger elementos de esa pagina. Uno pinta y el analiza.
import HomePage from '@/app/page';

describe("Home Page",()=>{
    beforeEach(()=>{
         // Renderizamos la página o componente
        render(<HomePage/>);
    })
    //Test para validar existencia del texto
    it('render home page', () => {

        // Verificamos que el texto "Prueba testing" esté presente en el documento
        expect(screen.getAllByText("Prueba testing"));
      });
});