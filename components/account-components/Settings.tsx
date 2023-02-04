import { Fragment, useRef, useState } from 'react';
import { Button, Space, Radio, RadioChangeEvent } from 'antd';
import { UserGetResponse } from '@/pages/api/user/[id]';
import EditBioModal from 'components/modals/EditBioModal';
import { EditBioRef } from 'components/modals/EditBioModal';
import NewTripModal, { NewTripRef } from 'components/modals/NewTripModal';
import { User } from '@/pages/account';
import {signOut} from "next-auth/react"

interface Props {
	user: User;
	hobbies: string[];
	jobs: string[];
}

const Settings: React.FC<Props> = ({ user, hobbies, jobs }) => {
	const editBioRef = useRef<EditBioRef>(null);
	const newTripRef = useRef<NewTripRef>(null);

	return (
		<>
			<div className="grid grid-cols-2 grid-rows-2 gap-x-4">
				<Button onClick={() => editBioRef.current?.showModal(true)} type="primary">
					Edit Bio
				</Button>
				<Button onClick={() => newTripRef.current?.showModal(true)} type="primary">
					New Trip
				</Button>
			</div>
			<div className="text-black"></div>
			<EditBioModal user={user} ref={editBioRef} hobbies={hobbies} jobs={jobs} />
			<NewTripModal ref={newTripRef} user={user} />
		</>
	);
};

export default Settings;
