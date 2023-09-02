import PropTypes from 'prop-types'
function Main({ children }) {
  return <main className="main">{children}</main>
}

export default Main

Main.propTypes = {
  children: PropTypes.node.isRequired,
}
