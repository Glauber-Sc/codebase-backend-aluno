import md5 from 'md5';

export function verificaSenha(senha, hash) {
  const senhaHash = md5(senha);
  return senhaHash === hash;
}
