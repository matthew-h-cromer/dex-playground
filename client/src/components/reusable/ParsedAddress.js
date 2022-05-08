import contracts from '../../constants/contracts';
import tokens from '../../constants/tokens';
import users from '../../constants/users';

const combined = [
  ...Object.values(contracts),
  ...Object.values(tokens),
  ...users,
  { address: '0x0000000000000000000000000000000000000000', title: 'The Abyss' },
];

export default function ({ address }) {
  const found = combined.find(_ => {
    if (!_.address || !address) return false;
    return _.address.toLowerCase() === address.toLowerCase();
  });

  if (found) return `${found.title} (${address})`;

  return address;
}
