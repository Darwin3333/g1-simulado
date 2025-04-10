import React, { CSSProperties } from 'react';

const spinnerStyle: CSSProperties = {
  border: 'var(--gap-s) solid var(--color-3)',
  borderRightColor: 'var(--color-4)',
  width: 'var(--gap)',
  height: 'var(--gap)',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const wrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '300px', // ou 100vh se quiser ocupar a tela inteira
  gap: '1rem',
};

export function Loading() {
  return (
    <div style={wrapperStyle}>
      <div style={spinnerStyle} />
      <span>Carregando cafés...</span>
      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}
