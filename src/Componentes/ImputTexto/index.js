import { TextField } from "@mui/material"


const InputTexto = ({ label, value, evento }) =>{
    return (
        <div style={{ margin: '20px' }}>
            <TextField 
                onChange={evento}
                id="filled-basic" 
                value={value}
                label={label} variant="filled"
                sx={{
                    backgroundColor: '#EFEFEF',
                    boxShadow: '0px 4px 4px 0px #00000040',
                    color: 'black',
                    width: '100%',
                }}

            />

            
        </div>

    )
}
export default InputTexto