import { ReactNode } from 'react';

interface MessageProps {
	type: 'information' | 'alert';
	children: ReactNode;
}

const Message = ({ type, children }: MessageProps) => {
	let color;

	if (type === 'information') {
		color = '#27a844';
	} else {
		color = '#dc3546';
	}

	return <div style={{ background: color }}>{children}</div>;
};

export default Message;
