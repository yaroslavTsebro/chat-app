import { ReactNode } from "react";
import { Navbar } from "react-bootstrap";

interface Props {
  children?: ReactNode | ReactNode[];
  zeroHeightNavbar?: boolean;
}

export default function Layout({ children, zeroHeightNavbar }: Props) {
  return (
		<>
			<Navbar zeroHeight={zeroHeightNavbar} />
			<div style={{ minHeight: 'calc(100vh - 116px)' }}>
				{children}
			</div>
			<Footer />
		</>
	);
}
