import { Box } from '@mui/material'
import clsx from 'clsx'

import s from './loader.module.css'

type LoaderProps = {
  className?: string
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className={className}
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
