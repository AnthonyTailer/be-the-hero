import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css';
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function Register () {
  const history = useHistory()
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ whatsapp, setWhatsapp ] = useState('')
  const [ city, setCity ] = useState('')
  const [ uf, setUf ] = useState('')

  async function handleRegister(e) {
    e.preventDefault()
    try {
      const response = await api.post('ongs', {
        name,
        email,
        whatsapp,
        city,
        uf
      })

      alert(`Seu ID de acesso: ${response.data.id}`)
      history.push('/')

    } catch (e) {
      alert(`Erro no cadsatro, tente novamente.`)
    }

  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de suas ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041"/>
            Logon
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome da ONG"
            required
            value={name}
            onChange={e => setName(e.target.value) }
          />
          <input
            type="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={e => setEmail(e.target.value) }
          />
          <input
            type="number"
            placeholder="WhatsApp"
            required
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value) }
          />

          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              required
              value={city}
              onChange={e => setCity(e.target.value) }
            />
            <input
              type="text"
              maxLength={2}
              placeholder="UF"
              style={{ width: 80 }}
              required
              value={uf}
              onChange={e => setUf(e.target.value) }
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}