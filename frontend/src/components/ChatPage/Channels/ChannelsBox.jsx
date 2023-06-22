import { Col, Nav } from 'react-bootstrap';
import { PlusSquareFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { selectors as channelsSelectors } from '../../../slices/channelsSlice';
import { actions as modalsActions } from '../../../slices/modalSlice';

import Channel from './Channel';

const ChannelsBox = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const handleAddChannel = () => {
    dispatch(modalsActions.open({ type: 'adding', targetId: null }));
  };

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channelsTitle')}</b>
        <button onClick={handleAddChannel} className="p-0 text-primary btn btn-group-vertical" type="button">
          <PlusSquareFill size={25} />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <Nav variant="pills" className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Channel key={channel.id} channel={channel} isActive={currentChannelId === channel.id} />
        ))}
      </Nav>
    </Col>
  );
};

export default ChannelsBox;
