import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.scss'
})
export class CalculadoraComponent {

  operacaoAnterior:any = '';
  operacaoAtual:any ='';
  primeiraOperacao =true;

  adicionaAoVisor(value:any){
    if(this.primeiraOperacao)
      if(+value >= 0 || value === "."){
        this.adicionarDigito(value)
      }else{
        this.processaOperacao(value)
  }
  else{
    this.operacaoAnterior = "";
    this.operacaoAtual = "";
    this.primeiraOperacao = true;
    if(+value >= 0 || value === "."){
      this.adicionarDigito(value)
    }else{
      this.processaOperacao(value)
}
  }
  }
  adicionarDigito(digito:any){
    if(digito === "." && this.operacaoAtual.includes(".")){
      return
} 
this.operacaoAtual += digito;
this.atualizarVisor(null,null,null,null)
}

  processaOperacao(operacao:any){
    if(this.operacaoAtual === "" && operacao !== "C"){
      
      if(this.operacaoAnterior !== ""){
        this.alterarOperacao(operacao)
      }
      return
      
  }
  let valorOperacao:any;
  let anterior = +this.operacaoAnterior.split(" ")[0];
  let atual = +this.operacaoAtual;

  switch(operacao){
    case"+":
    valorOperacao = anterior + atual;
    this.atualizarVisor(valorOperacao, operacao, atual,anterior);
    break
    case"-":
    valorOperacao = anterior - atual;
    this.atualizarVisor(valorOperacao, operacao, atual,anterior);
    break
    case"*":
    valorOperacao = anterior * atual;
    this.atualizarVisor(valorOperacao, operacao, atual,anterior);
    break
    case"/":
    valorOperacao = anterior / atual;
    this.atualizarVisor(valorOperacao, operacao, atual,anterior);
    break
    case"DEL":
    this.processarOperacaoDel()
    break
    case"CE":
    this.processarOperacaoCE()
    break
    case"C":
    this.processarOperacaoC()
    break
    case"=":
    this.processarOperacaoIgual()
    break
  }
}
alterarOperacao(operacao:any){

  const operacoesMat = [ "+", "-", "/", "*" ]
  if(!operacao.includes(operacao)){
    return
  }
  this.operacaoAnterior = this.operacaoAnterior.trim().slice(0, -1) + operacao;

}

atualizarVisor(
  valorOperacao = null,
  operacao = null,
  atual:any,
  anterio:any
){

  if(valorOperacao !== null){
   if(anterio === 0){
    valorOperacao = atual;
   }
   this.operacaoAnterior = `${atual} ${operacao}`
   if(anterio > 0){
    this.operacaoAnterior = `${anterio} ${operacao} ${atual}`
    this.operacaoAtual = valorOperacao;
   }else{
    this.operacaoAtual = "";
   }
  
  }
 
}
 processarOperacaoDel(){
    this.operacaoAtual = this.operacaoAtual.slice(0,-1);
    
 }
 processarOperacaoCE(){
    this.operacaoAtual = "";
 }
 processarOperacaoC(){
  this.operacaoAtual = "";
  this.operacaoAnterior = "";

 }
 processarOperacaoIgual(){
  let operacao = this.operacaoAnterior.split(" ")[1];
  this.primeiraOperacao = false;
  this.processaOperacao(operacao);
 }
}

