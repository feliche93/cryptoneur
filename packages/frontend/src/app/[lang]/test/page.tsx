import * as Icons from 'react-icons/md'

const Test = async () => {
  const icons = { ...Icons }

  const IconTest = icons['MdRocketLaunch']

  console.log(icons.length)

  return <IconTest />
}

export default Test
