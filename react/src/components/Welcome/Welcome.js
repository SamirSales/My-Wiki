import React from 'react';
import ReactMarkdown from 'react-markdown';

const welcome = ( props ) => {

    const body = "# Bem vindo ao Pickle Wiki \r"+
    "A Pickle Wiki é um projeto de enciclopédia de licença livre, baseado no sistema "+
    "[Wikipédia](https://www.wikipedia.org/) e escrito de maneira colaborativa. "+
    "Seu código fonte encontra-se no github, atualmente, sob administração de seu criador, Samir Sales. "+
    "O Pickle Wiki é uma ferramenta de pesquisa com foco em redes internas.\r"+
    
    "## Origem do nome\r"+
    "O nome Pickle Wiki é uma paródia do nome *Wikipédia* combinada com a expressão *“Pickle Rick”* "+
    "da animação americana Rick and Morty, criada por *Justin Roiland* e *Dan Harmon*.\r\r"+
    "![Bem vindo](/static/media/welcome_mini.9a3fd74d.png)\r"+
    
    "## Principais tecnologias utilizadas\r"+
    "* ReactJS 16\r"+
    "* Spring Boot\r"+
    "* PostGreSQL";

    return (
        <div className='text-editor-markdown'><ReactMarkdown source={body} /></div>
    )
};
export default welcome;