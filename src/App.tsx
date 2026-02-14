import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { adicionar } from './store/cartSlice'
import { toggleFavorito } from './store/favoritosSlice'
import { useGetProdutosQuery } from './store/api'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const dispatch = useDispatch()

  const { data: produtos = [] } = useGetProdutosQuery()

  const carrinho = useSelector((state: RootState) => state.carrinho.itens)
  const favoritos = useSelector((state: RootState) => state.favoritos.itens)

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />

        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={(produto) => dispatch(toggleFavorito(produto))}
          adicionarAoCarrinho={(produto) => dispatch(adicionar(produto))}
        />
      </div>
    </>
  )
}

export default App
