import { Fragment, useRef, useState } from 'react';
import { Button, Space, Radio, RadioChangeEvent } from 'antd';
import { UserGetResponse } from '@/pages/api/user/[id]';
import EditBioModal from 'components/modals/EditBioModal';
import { EditBioRef } from 'components/modals/EditBioModal';
import NewTripModal, { NewTripRef } from 'components/modals/NewTripModal';
import { User } from '@/pages/users/[[...id]]';
import { signOut } from 'next-auth/react';

interface Props {
	user: User;
}

const Friends: React.FC<Props> = ({ user }) => {
	return (
		<>
			<div className="">
				{user.friends.map((friend) => (
					<div>{friend.name}</div>
				))}
			</div>
		</>
	);
};

export default Friends;
