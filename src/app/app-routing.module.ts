import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'analise',
    loadChildren: () => import('./analise/analise.module').then( m => m.AnalisePageModule)
  },
  {
    path: 'criar-analise',
    loadChildren: () => import('./criar-analise/criar-analise.module').then( m => m.CriarAnalisePageModule)
  },
  {
    path: 'usuario-logado',
    loadChildren: () => import('./usuario-logado/usuario-logado.module').then( m => m.UsuarioLogadoPageModule)
  },
  {
    path: 'listar-analises',
    loadChildren: () => import('./listar-analises/listar-analises.module').then( m => m.ListarAnalisesPageModule)
  },
  {
    path: 'listar-usuarios',
    loadChildren: () => import('./listar-usuarios/listar-usuarios.module').then( m => m.ListarUsuariosPageModule)
  },
  {
    path: 'listar-respostas',
    loadChildren: () => import('./listar-respostas/listar-respostas.module').then( m => m.ListarRespostasPageModule)
  },
  {
    path: 'criar-usuario',
    loadChildren: () => import('./criar-usuario/criar-usuario.module').then( m => m.CriarUsuarioPageModule)
  },
  {
    path: 'cadastrar-amostra',
    loadChildren: () => import('./cadastrar-amostra/cadastrar-amostra.module').then( m => m.CadastrarAmostraPageModule)
  },
  {
    path: 'alterar-analise',
    loadChildren: () => import('./alterar-analise/alterar-analise.module').then( m => m.AlterarAnalisePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
