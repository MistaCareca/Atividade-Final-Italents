import Button from "./Button/Button";
import Input from "./Input/Input";
import './Forms.css';

const Forms = () => {
    return(
        <form>
            <h1>Envie seu Feedback</h1>
            <label>
                E-mail:
                <Input type="text" placeholder="E-mail" />
            </label>
            <label>
                Mensagem:
                <Input type="text" placeholder="Mensagem..." />
            </label>
            <Button type="submit" text="Enviar"/>
        </form>
    );
}

export default Forms;
