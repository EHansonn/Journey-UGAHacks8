import { Fragment, useRef, useState } from 'react';
import { Button, Space, Radio, RadioChangeEvent, Card } from 'antd';
import { UserGetResponse } from '@/pages/api/user/[id]';
import EditBioModal from 'components/modals/EditBioModal';
import { EditBioRef } from 'components/modals/EditBioModal';
import NewTripModal, { NewTripRef } from 'components/modals/NewTripModal';
import { User } from '@/pages/users/[[...id]]';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

interface Props {
	user: User;
	changeHandler: () => void;
}

const Friends: React.FC<Props> = ({ user, changeHandler }) => {
	const router = useRouter();
	return (
		<>
			<div className="flex gap-2 flex-wrap justify-center ">
				{user.friends.map((u, i) => (
					<Card key={i} title={u.name} className="mb-3" size="small">
						<div className="flex ">
							<img src={u.image ?? ''} className=" bg-slate-500 rounded-full  h-[100px] w-[100px] mr-3" />
							<div className="flex flex-col justify-evenly">
								<Button
									className="w-32 "
									onClick={() => {
										changeHandler();
										router.push(`/users/${u.id}`);
									}}
									type="primary"
								>
									View Profile
								</Button>
							</div>
						</div>
					</Card>
				))}
			</div>
		</>
	);
};

export default Friends;
