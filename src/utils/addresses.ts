import type {
  AddressWithRest,
  LiteCoinAddress,
} from '@services/echoApi';

export function formatDisplayedLiteCoinAddress(
  liteCoinAddress: LiteCoinAddress,
  opts: {
    includeAmount?: boolean,
  } = {},
): string
{
  const { includeAmount = false } = opts;
  const { amount, address } = liteCoinAddress;

  const displayedAddressWithRest = formatDisplayedAddress(address);
  if (!includeAmount)
    return displayedAddressWithRest;
  return `${displayedAddressWithRest}: ${amount}`;
}

export function formatDisplayedLiteCoinAddresses(
  addresses: Array<LiteCoinAddress>,
  opts: {
    includeAmount?: boolean,
  } = {},
): Array<string>
{
  return addresses.map((value) => formatDisplayedLiteCoinAddress(value, opts));
}

export function formatDisplayedAddress(address: AddressWithRest): string
{
  const {
    addr,
    rest,
  } = address;

  if (rest)
    return rest;
  return addr.slice(0, 10);
}