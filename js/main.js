function cadastro() 
{
    usuarios = localStorage.getItem('usuarios');
	$.ajax({
        url: 'ajax/ajax.php?post=cadastro',
        type: 'POST',
        datatype:'html',
        data: $('#cadastro').serialize() + '&usuarios=' + usuarios,
        complete:function(XMLHttpRequest){
            Resp = XMLHttpRequest.responseText;
            if(Resp == 0 || Resp == false || Resp == null){
                alert('Erro: retornou falso');
            } else {
                // Grava a resposta do AJAX no localStorage
    			localStorage.setItem('usuarios', Resp); 

            	// debug
            	Objeto = localStorage.getItem(Classe);
            	console.log(Objeto);
            	Objeto_json = JSON.parse(Objeto);
            	console.log(Objeto_json);

            	alert('Cadastrado com sucesso!');
                window.location = 'endereco.php';
            }
        }
    });
}

function info_usuario () {
    // body...
}

function pegaListaAltera(Classe) 
{
	ObjetoLocal = localStorage.getItem(Classe);
	$.ajax({
        url: UrlSite+'ajax/ajax.php?Opcao=lista_altera_'+Classe,
        type: 'POST',
        datatype:'html',
        data: {
        	ObjLocal : ObjetoLocal
        },
        complete:function(Req){
            Resp = Req.responseText;
            if(Resp == 0 || Resp == false || Resp == null){
                alert('Erro: retornou falso');
            } else {
                $('#cad').hide();
            	$('#alt').html(Resp);
            }
        }
    });
}

function selecionaAlterar(Classe, Cod) 
{
	ObjetoLocal = localStorage.getItem(Classe);
	ObjetoLocal_json = JSON.parse(ObjetoLocal);
	Qtd = ObjetoLocal_json.length;
	for(i = 0; i < Qtd; i++) {
		if(ObjetoLocal_json[i].Cod == Cod) {
			$('#Cod').val(ObjetoLocal_json[i].Cod);
			$('#Nome').val(ObjetoLocal_json[i].Nome);
			$('#DataNasc').val(ObjetoLocal_json[i].DataNasc);
			$('#CPF').val(ObjetoLocal_json[i].CPF);
            $('#Telefone').val(ObjetoLocal_json[i].Telefone);
            $('#Descricao').val(ObjetoLocal_json[i].Descricao);
            $('#TempoDevolucao').val(ObjetoLocal_json[i].TempoDevolucao);
            $('#Preco').val(ObjetoLocal_json[i].Preco);
            $('#Diretor').val(ObjetoLocal_json[i].Diretor);
            $('#Titulo').val(ObjetoLocal_json[i].Titulo);
            $('#Salario').val(ObjetoLocal_json[i].Salario);
            $('#Pontos').val(ObjetoLocal_json[i].Pontos);
			$('#cad').show();
		}
	}
}

function pegaListBox(Classe)
{
    ObjetoLocal = localStorage.getItem(Classe);
    $.ajax({
        url: UrlSite+'ajax/ajax.php?Opcao=listbox_'+Classe,
        type: 'POST',
        datatype:'html',
        data: {
            ObjLocal : ObjetoLocal
        },
        complete:function(Req){
            Resp = Req.responseText;
            if(Resp == 0 || Resp == false || Resp == null){
                alert('Erro: retornou falso');
            } else {
                if(Classe == 'categoria') {
                    $('#Categoria').html(Resp);
                } 
                if(Classe == 'rotulo') {
                    $('#Rotulo').html(Resp);
                }
                if(Classe == 'obra') {
                    $('#Obra').html(Resp);
                }
                if(Classe == 'tipomidia') {
                    $('#TipoMidia').html(Resp);
                }
                if(Classe == 'midia') {
                    $('#Midia').html(Resp);
                }
                if(Classe == 'funcionario') {
                    $('#Funcionario').html(Resp);
                }
                if(Classe == 'cliente') {
                    $('#Cliente').html(Resp);
                }
            }
        }
    });
}

function atualizaPreco()
{
    var ObraCod = $('#Obra').val();
    var TipoMidiaCod = $('#TipoMidia').val();

    var ObjObras = JSON.parse(localStorage.getItem("obra"));
    var ObjRotulo = ObjObras[ObraCod].Rotulo;
    var ObjTipoMidias = JSON.parse(localStorage.getItem("tipomidia"));

    var PrecoTipoMidia = ObjTipoMidias[TipoMidiaCod].Preco;
    var PrecoRotuloObra = ObjRotulo.Preco;

    var PrecoTipoMidia = PrecoTipoMidia.substring(3,7).replace(",",".");
    var PrecoRotuloObra = PrecoRotuloObra.substring(3,7).replace(",",".");

    var PrecoTipoMidia = parseFloat(PrecoTipoMidia);
    var PrecoRotuloObra = parseFloat(PrecoRotuloObra);

    Preco = PrecoTipoMidia + PrecoRotuloObra;
    $('#Preco').val('R$ ' + Preco);
}