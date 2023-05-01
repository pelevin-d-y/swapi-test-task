import { Box } from '@mui/material'
import s from './Loader.module.css'
import clsx from 'clsx'

export const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className={s.box}>
        <div className={s.loader}>
          <div className={clsx(s['s-particles'], s['ls-part-1'])}></div>
          <div className={clsx(s['ls-particles'], s['ls-part-2'])}></div>
          <div className={clsx(s['ls-particles'], s['ls-part-3'])}></div>
          <div className={clsx(s['ls-particles'], s['ls-part-4'])}></div>
          <div className={clsx(s['ls-particles'], s['ls-part-5'])}></div>
          <div
            className={clsx(s.lightsaber, s['ls-left'], s['ls-green'])}
          ></div>
          <div className={clsx(s.lightsaber, s['ls-right'], s['ls-red'])}></div>
        </div>
      </div>
    </Box>
  )
}
